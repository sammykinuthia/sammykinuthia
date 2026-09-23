import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setBusy(false);

    if (signInError) {
      setError(signInError.message || 'Login failed. Please check your credentials.');
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-200 border border-primary/15 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Portfolio</p>
          <h2 className="card-title text-2xl font-bold uppercase">Admin login</h2>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          <label className="form-control">
            <span className="label-text">Email</span>
            <input type="email" className="input input-bordered" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="form-control">
            <span className="label-text">Password</span>
            <input type="password" className="input input-bordered" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link to="/request-password-reset" className="link-hover link text-sm mt-2">Forgot password?</Link>
          </label>
          <button type="submit" className="btn btn-primary mt-2" disabled={busy}>
            {busy ? 'Signing in...' : 'Login'}
          </button>
          <p className="text-center text-sm mt-2 text-gray-400">
            First account becomes admin.{' '}
            <Link to="/register" className="link-primary link">Register</Link>
          </p>
          <Link to="/" className="btn btn-ghost btn-sm">Back to portfolio</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
