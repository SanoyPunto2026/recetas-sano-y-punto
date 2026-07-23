"use server";

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function loginAction(password: string) {
  try {
    // Buscar la contraseña maestra en la tabla app_settings
    const { data, error } = await supabaseAdmin
      .from('app_settings')
      .select('value')
      .eq('key', 'master_password')
      .single();

    if (error) {
      console.error("Error obteniendo contraseña maestra:", error);
      return { success: false, error: "Error de servidor al verificar credenciales." };
    }

    if (data?.value === password) {
      // Contraseña correcta, crear cookie
      const cookieStore = await cookies();
      cookieStore.set('recetario_auth_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 semana
      });

      return { success: true };
    } else {
      return { success: false, error: "Contraseña incorrecta." };
    }
  } catch (error) {
    console.error("Error inesperado en login:", error);
    return { success: false, error: "Error inesperado." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('recetario_auth_token');
  return { success: true };
}
