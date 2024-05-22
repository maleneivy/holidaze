import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className="about-page p-4">
      <img
        src="/nature_image_by_burkard_meyendriesch.jpg"
        alt="Image of a house at the coast at sunset. By Burkard Meyendriesch"
        className="my-4 w-full"
      />
      <h1 className="mb-4 text-3xl font-bold">About Holidaze</h1>
      <p className="mb-2">
        Welcome to <strong>Holidaze</strong>, an accommodation booking site
        designed to make your travel planning easy and enjoyable. This project
        is part of an exam to showcase the skills and knowledge acquired during
        our studies.
      </p>
      <h2 className="mb-2 mt-4 text-2xl font-semibold">Our Platform</h2>
      <p className="mb-2">Holidaze caters to two main user groups:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Customers</strong> – Users who can browse and book various
          venues for their stay.
        </li>
        <li>
          <strong>Venue Managers</strong> – Users who can create and manage
          venues, making them available for bookings by customers.
        </li>
      </ul>
      <h2 className="mb-2 mt-4 text-2xl font-semibold">Key Features</h2>
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
      <h2 className="mb-2 mt-4 text-2xl font-semibold">Our Goal</h2>
      <p className="mb-2">
        Our aim is to provide a user-friendly platform that simplifies the
        process of booking accommodations. Whether you're a traveler looking for
        a place to stay or a venue manager wanting to list your property,
        Holidaze is designed to meet your needs.
      </p>
      <h2 className="mb-2 mt-4 text-2xl font-semibold">Mobile-First Design</h2>
      <p>
        Holidaze is built with a mobile-first view, ensuring that users have a
        smooth and intuitive experience regardless of the device they are using.
        This approach helps us create a responsive and accessible platform for
        all users.
      </p>
      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        Want to become a customer/manager?
      </h2>
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
