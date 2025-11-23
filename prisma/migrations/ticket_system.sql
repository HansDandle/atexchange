-- Create tickets table
CREATE TABLE "public"."tickets" (
    "id" text NOT NULL,
    "venueSlotId" text NOT NULL,
    "bandId" text NOT NULL,
    "quantity" integer NOT NULL,
    "rsvpCount" integer NOT NULL DEFAULT 0,
    "shareUrl" text NOT NULL UNIQUE,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "tickets_venueSlotId_bandId_key" UNIQUE ("venueSlotId", "bandId"),
    CONSTRAINT "tickets_venueSlotId_fkey" FOREIGN KEY ("venueSlotId") REFERENCES "public"."venue_slots" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT "tickets_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "public"."band_profiles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Create ticket_rsvps table
CREATE TABLE "public"."ticket_rsvps" (
    "id" text NOT NULL,
    "ticketId" text NOT NULL,
    "userId" text,
    "email" text,
    "name" text,
    "createdAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT "ticket_rsvps_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ticket_rsvps_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."tickets" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "tickets_venueSlotId_idx" ON "public"."tickets" ("venueSlotId");
CREATE INDEX "tickets_bandId_idx" ON "public"."tickets" ("bandId");
CREATE INDEX "ticket_rsvps_ticketId_idx" ON "public"."ticket_rsvps" ("ticketId");
CREATE INDEX "ticket_rsvps_userId_idx" ON "public"."ticket_rsvps" ("userId");
