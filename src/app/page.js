import GetVenues from '@/components/GetVenues/GetVenues';
import ScrollToTopBtn from '@/components/ScrollToTopButton/ScrollToTopBtn';

export default function Home() {
  return (
    <main>
      <div>
        <GetVenues />
        <ScrollToTopBtn />
      </div>
    </main>
  );
}
