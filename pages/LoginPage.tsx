import React from 'react';
import Button from '../components/UI/Button';
import Logo from '../components/Logo';

interface LoginPageProps {
    onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-med-teal/5">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Logo className="w-16 h-16"/></div>
            <h1 className="font-serif font-bold text-3xl text-med-teal">Welcome Back</h1>
            <p className="text-ink/60 font-sans mt-2">Log in to manage your directory listing.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
            <div>
                <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Email Address</label>
                <input type="email" className="w-full p-3 bg-bone/30 border border-med-teal/10 rounded-lg focus:border-retro-orange outline-none transition-colors" placeholder="name@company.com" defaultValue="demo@example.com" />
            </div>
            <div>
                <label className="block text-xs font-bold font-tech text-med-teal uppercase mb-2">Password</label>
                <input type="password" className="w-full p-3 bg-bone/30 border border-med-teal/10 rounded-lg focus:border-retro-orange outline-none transition-colors" placeholder="••••••••" defaultValue="password" />
            </div>
            <Button className="w-full" type="submit">Log In</Button>
        </form>
        <div className="mt-6 text-center text-sm font-sans text-ink/60">
            Don't have an account? <button onClick={() => onNavigate('join')} className="text-retro-orange font-bold hover:underline">Join the Directory</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;