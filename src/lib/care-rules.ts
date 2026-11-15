import { z } from 'zod';
export const pinSchema = z.string().regex(/^\d{4}$/, 'Enter a four-digit passcode');
export const roleSchema = z.enum(['caretaker', 'elderly']);
export const medicationSchema = z.object({ name: z.string().min(1).max(120), dosage: z.string().min(1).max(80), scheduled_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), instructions: z.string().max(800), frequency: z.string().default('Daily'), time_of_day: z.enum(['Morning','Afternoon','Night']) });
export function canManage(role: string) { return role === 'caretaker'; }
export function adherence(meds: {status:string}[]) { return meds.length ? Math.round(meds.filter(m=>m.status==='taken').length/meds.length*100) : 0; }