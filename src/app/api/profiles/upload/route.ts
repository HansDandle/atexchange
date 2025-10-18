import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    const type = (form.get('type') as string) || 'photos'
    const folder = type === 'audioSamples' ? 'audio' : 'photos'

    if (!file) return NextResponse.json({ error: 'missing file' }, { status: 400 })

    const supabase = createClient()
    const bucket = 'public'
    const key = `${type}/${Date.now()}-${(file as any).name || 'upload'}`

    const arrayBuffer = await file.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)

    const { data, error } = await supabase.storage.from(bucket).upload(key, uint8)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return NextResponse.json({ ok: true, publicUrl: urlData.publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
