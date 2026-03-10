import Header from './header';
import Footer from './footer';
import { InputsContextWrapper } from '../inputs-context-wrapper';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-default text-text-primary transition-colors duration-200">
      <Header />
      <InputsContextWrapper>
        <main className="max-w-3xl w-full mx-auto px-4 py-6 sm:py-8 flex-1">
          {children}
        </main>
      </InputsContextWrapper>
      <Footer />
    </div>
  );
}
