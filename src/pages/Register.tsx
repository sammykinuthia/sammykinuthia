import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    const { error: signUpError } = await authClient.signUp.email({
      email,
      password,
      name: name || email.split('@')[0],
    });

    setBusy(false);

    if (signUpError) {
      const message = signUpError.message || 'Registration failed. Please try again.';
      setError(message.includes('fetch') || message.includes('Failed')
        ? 'Could not reach the API. Is `npm run server` running?'
        : message);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-200 border border-primary/15 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Portfolio</p>
          <h2 className="card-title text-2xl font-bold uppercase">Create account</h2>
          {error && <div className="alert alert-error text-sm">{error}</div>}
          <label className="form-control">
            <span className="label-text">Name</span>
            <input className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="form-control">
            <span className="label-text">Email</span>
            <input type="email" className="input input-bordered" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="form-control">
            <span className="label-text">Password</span>
            <input type="password" className="input input-bordered" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className="btn btn-primary mt-2" disabled={busy}>
            {busy ? 'Creating...' : 'Register'}
          </button>
          <p className="text-center text-sm mt-2">
            Already have an account?{' '}
            <Link to="/login" className="link-primary link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
