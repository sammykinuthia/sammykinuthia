import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authClient } from '../lib/auth';

function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setBusy(false);
    if (resetError) {
      setError(resetError.message || 'Could not reset password.');
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-200 border border-primary/15 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl font-bold uppercase">New password</h2>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          {done ? (
            <p className="text-gray-400">Password updated. <Link to="/login" className="link-primary">Sign in</Link></p>
          ) : (
            <>
              <input type="password" className="input input-bordered" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
              <button className="btn btn-primary" disabled={busy || !token}>{busy ? 'Saving...' : 'Update password'}</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
