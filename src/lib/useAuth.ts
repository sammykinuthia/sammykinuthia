import { useEffect, useState } from 'react';
import { api } from './api';
import { authClient } from './auth';

export function useAuth() {
  const session = authClient.useSession();
  const [role, setRole] = useState<string | null>(null);
  const [roleReady, setRoleReady] = useState(false);

  useEffect(() => {
    if (session.isPending) {
      setRoleReady(false);
      return;
    }

    if (!session.data?.user) {
      setRole(null);
      setRoleReady(true);
      return;
    }

    const extraRole = (session.data.user as { role?: string }).role;
    if (extraRole) setRole(extraRole);

    let cancelled = false;
    api.me()
      .then((me) => {
        if (!cancelled) setRole(me.role);
      })
      .catch(() => {
        if (!cancelled && !extraRole) setRole(null);
      })
      .finally(() => {
        if (!cancelled) setRoleReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [session.data, session.isPending]);

  return {
    user: session.data?.user ?? null,
    role,
    isAdmin: role === 'admin',
    isPending: session.isPending || !roleReady,
    refetch: session.refetch,
  };
}
