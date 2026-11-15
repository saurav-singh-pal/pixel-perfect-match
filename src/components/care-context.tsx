import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readCare, joinProfile } from '@/lib/care.functions';
import { toast } from 'sonner';

type CareData=Awaited<ReturnType<typeof readCare>>;
type CareContextType={ data:CareData|undefined; loading:boolean; error:Error|null; token:string; role:'caretaker'|'elderly'; large:boolean; setLarge:(v:boolean)=>void; connect:(token:string,role:'caretaker'|'elderly')=>void; switchRole:(role:'caretaker'|'elderly')=>Promise<void>; ensureToken:()=>Promise<string>; refresh:()=>Promise<void>; };
const CareContext=createContext<CareContextType|null>(null);
export function CareProvider({children}:{children:ReactNode}) {
 const [token,setToken]=useState('');const [role,setRole]=useState<'caretaker'|'elderly'>('caretaker');const [large,setLarge]=useState(false);const qc=useQueryClient();
 useEffect(()=>{const saved=sessionStorage.getItem('care-session');const r=sessionStorage.getItem('care-role');if(saved)setToken(saved);if(r==='elderly'||r==='caretaker')setRole(r);},[]);
 const query=useQuery({queryKey:['care',token],queryFn:()=>readCare({data:{token:token||undefined}}),retry:false,refetchInterval:30000});
 const connect=(t:string,r:'caretaker'|'elderly')=>{setToken(t);setRole(r);sessionStorage.setItem('care-session',t);sessionStorage.setItem('care-role',r);};
 const ensureToken=async()=>{if(token)return token;if(query.data?.profile.is_demo){const t=await joinProfile({data:{pin:'1234',role,demo:true}});connect(t,role);return t;}throw new Error('Enter your care profile passcode.');};
 const switchRole=async(r:'caretaker'|'elderly')=>{if(query.data?.profile.is_demo){const t=await joinProfile({data:{pin:'1234',role:r,demo:true}});connect(t,r);}else toast.info('Open Profile & Passcode Hub to join in another role.');};
 const refresh=async()=>{await qc.invalidateQueries({queryKey:['care']});};
 return <CareContext.Provider value={{data:query.data,loading:query.isPending,error:query.error,token,role,large,setLarge,connect,switchRole,ensureToken,refresh}}>{children}</CareContext.Provider>;
}
export function useCare(){const c=useContext(CareContext);if(!c)throw new Error('Care provider missing');return c;}