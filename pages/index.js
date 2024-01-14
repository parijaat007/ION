import Header from '../components/Header';
import Footer from '../components/Footer';
import AppRouter from '../components/AppRouter';
import Login from '../components/Login';

export default function Home() {
  const handleLogin = () => {
    // Implement login logic or show a login modal
    console.log("Login clicked");
  };

  return (
    <div>
      <Header onLogin={handleLogin} />
      <AppRouter />
      <main>
        <h1>Welcome to My App</h1>
        <Login onLogin={handleLogin} />
        {/* Add more content for your landing page here */}
      </main>
      <Footer />
    </div>
  );
}
