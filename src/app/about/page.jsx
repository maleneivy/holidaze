import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className="about-page mx-10 p-4">
      <div className="flex flex-col">
        <Image
          src="/nature_image_by_burkard_meyendriesch.jpg"
          alt="Image of a house at the coast at sunset. By Burkard Meyendriesch"
          className="my-4 w-full"
          width={1200}
          height={800}
        />
        <p className="mb-4 text-end">
          Image by:{' '}
          <Link
            href="https://pixabay.com/users/bmeyendriesch-10689819/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6862612"
            className="underline"
          >
            Burkard Meyendriesch
          </Link>
        </p>
      </div>
      <h1>About Holidaze</h1>
      <p className="mb-2">
        Welcome to Holidaze, an accommodation booking site designed to make your
        travel planning easy and enjoyable. This project is part of an exam to
        showcase the skills and knowledge acquired during our studies.
      </p>
      <h2>Our Platform</h2>
      <p className="mb-2">Holidaze caters to two main user groups:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Customers</strong> - Users who can browse and book various
          venues for their stay.
        </li>
        <li>
          <strong>Venue Managers</strong> - Users who can create and manage
          venues, making them available for bookings by customers.
        </li>
      </ul>
      <h2>Key Features</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>Easy to use interface for both customers and venue managers.</li>
        <li>
          Responsive design with a mobile-first approach, ensuring a seamless
          experience on any device.
        </li>
        <li>
          Comprehensive booking system allowing customers to choose dates and
          book venues effortlessly.
        </li>
        <li>
          Venue managers can easily list new venues and manage existing
          bookings.
        </li>
      </ul>
      <h2>Our Goal</h2>
      <p className="mb-2">
        Our aim is to provide a user-friendly platform that simplifies the
        process of booking accommodations. Whether you&apos;re a traveler
        looking for a place to stay or a venue manager wanting to list your
        property, Holidaze is designed to meet your needs.
      </p>
      <h2>Mobile-First Design</h2>
      <p>
        Holidaze is built with a mobile-first view, ensuring that users have a
        smooth and intuitive experience regardless of the device they are using.
        This approach helps us create a responsive and accessible platform for
        all users.
      </p>
      <h2>Want to become a customer/manager?</h2>
      <Link
        href="/register"
        className="rounded p-2 underline hover:bg-lightGreen"
      >
        Register here
      </Link>
    </div>
  );
};

export default About;
