import { describe,it,expect } from 'vitest';
import { pinSchema,canManage,adherence } from '@/lib/care-rules';
describe('Care profile rules',()=>{
 it('accepts the requested demo PIN 1234',()=>expect(pinSchema.safeParse('1234').success).toBe(true));
 it('requires exactly four numeric PIN digits',()=>{expect(pinSchema.safeParse('123').success).toBe(false);expect(pinSchema.safeParse('12345').success).toBe(false);expect(pinSchema.safeParse('abcd').success).toBe(false);});
 it('allows only caretaker management',()=>{expect(canManage('caretaker')).toBe(true);expect(canManage('elderly')).toBe(false);});
 it('counts only taken doses in adherence',()=>expect(adherence([{status:'taken'},{status:'missed'},{status:'upcoming'},{status:'taken'}])).toBe(50));
});