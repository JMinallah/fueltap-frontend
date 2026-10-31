import { z } from "zod";

export const stationSchema = z.object({
  name: z
    .string({ message: "field cannot be empty." })
    .min(2, { message: "Station name must be at least 2 characters." }),
  address: z
    .string({ message: "field cannot be empty." })
    .min(5, { message: "Please enter a valid address." }),
  state: z.string({ message: "State is required." }).min(1, "State is required."),
  city: z.string({ message: "City is required." }).min(1, "City is required."),
  managerId: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type StationInput = z.infer<typeof stationSchema>;

export const managerSchema = z.object({
  name: z
    .string({ message: "field cannot be empty." })
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string({ message: "field cannot be empty." })
    .email({ message: "Please enter a valid email address." }),
  phone: z
    .string({ message: "field cannot be empty." })
    .regex(/^(?:\+?234|0)?([789]\d{9})$/, { message: "Please enter a valid Nigerian phone number." }),
  stationId: z.string({ message: "Station is required." }).min(1, "Please select a station."),
});

export type ManagerInput = z.infer<typeof managerSchema>;
