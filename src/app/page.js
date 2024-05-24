import GetVenues from '@/components/GetVenues/GetVenues';
import ScrollToTopBtn from '@/components/ScrollToTopButton/ScrollToTopBtn';

export default function Home() {
  return (
    <main>
      <div>
        <h1 className="text-blue">Find your next Holidaze home</h1>
        <GetVenues />
        <ScrollToTopBtn />
      </div>
    </main>
  );
}
