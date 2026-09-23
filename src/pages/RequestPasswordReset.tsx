import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authClient } from '../lib/auth';

function RequestPasswordResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);

    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setBusy(false);

    if (resetError) {
      setError(resetError.message || 'Failed to send reset link. Please try again.');
      return;
    }

    setMessage('If an account with that email exists, a password reset link has been sent.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-200 border border-primary/15 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl font-bold uppercase">Reset password</h2>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          {message && <div className="alert alert-success text-sm">{message}</div>}
          <label className="form-control">
            <span className="label-text">Email</span>
            <input type="email" className="input input-bordered" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Sending...' : 'Send reset link'}
          </button>
          <Link to="/login" className="link-primary link text-center text-sm mt-2">Back to login</Link>
        </form>
      </div>
    </div>
  );
}

export default RequestPasswordResetPage;
