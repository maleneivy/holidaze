import Link from 'next/link';
import BaseButton from '@/components/BaseButton/BaseButton';
import BookingCalendar from '@/components/Booking/BookingCalendar';

const BookingsList = ({
  profile,
  bookings,
  selectedDates,
  isEditingBooking,
  handleEditBooking,
  handleDateChange,
  handleUpdateBooking,
  confirmDeleteBooking,
  setIsEditingBooking,
}) => (
  <div className="mx-4">
    <h2 className="my-4">My upcoming bookings</h2>
    <div className="my-4 flex flex-col space-y-4">
      {bookings
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
        .map((booking, index) => {
          const totalPrice =
            ((new Date(booking.dateTo) - new Date(booking.dateFrom)) /
              (1000 * 60 * 60 * 24)) *
            booking.venue.price;
          return (
            <div
              key={index}
              className="mt-4 flex flex-col rounded p-4 shadow-md sm:flex-row"
            >
              <div>
                <img
                  src={booking.venue.media[0]?.url || '/default-image.jpg'}
                  alt={booking.venue.media[0]?.alt || 'Venue image'}
                  className="object-cover sm:size-32"
                />
              </div>
              <div className="ml-4">
                <Link
                  href={{
                    pathname: `/venue/${booking.venue.id}`,
                    query: {
                      from: 'profile',
                      profileName: profile.name,
                    },
                  }}
                >
                  <p className="mt-2 max-w-xs overflow-hidden truncate underline hover:font-bold sm:mt-0">
                    {booking.venue.name}
                  </p>
                </Link>
                <p className="max-w-xs overflow-hidden truncate">
                  {booking.venue.location.city}
                </p>
                <p className="max-w-xs overflow-hidden truncate">
                  {booking.venue.location.country}
                </p>
                <p>
                  {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>Guests: {booking.guests}</p>
                <p>Total cost: {totalPrice} NOK</p>
                <div className="mx-auto mt-4 flex justify-between">
                  <BaseButton
                    onClick={() => handleEditBooking(booking)}
                    className="mr-2 rounded px-4 py-1 text-blue hover:font-bold focus:bg-yellow-100"
                  >
                    Edit booking
                  </BaseButton>
                  <button
                    onClick={() => confirmDeleteBooking(booking.id)}
                    className="rounded bg-lightRed px-4 py-1 text-darkBlue hover:bg-red hover:text-white"
                  >
                    Delete booking
                  </button>
                </div>
                {isEditingBooking === booking.id && (
                  <div className="mt-4">
                    <BookingCalendar
                      bookings={profile.bookings}
                      onDateChange={handleDateChange}
                    />
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const updatedBooking = {
                          dateFrom: selectedDates[0].toISOString(),
                          dateTo: selectedDates[1].toISOString(),
                          guests: Number(e.target.guests.value),
                        };
                        await handleUpdateBooking(booking.id, updatedBooking);
                      }}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-baseline justify-between">
                          <label>
                            Guests:
                            <input
                              type="number"
                              name="guests"
                              defaultValue={booking.guests}
                              min="1"
                              max={booking.venue.maxGuests}
                              className="ml-2 rounded border px-2"
                            />
                          </label>
                        </div>
                        <div className="mt-4">
                          <button
                            type="submit"
                            className="hover:bg-green mt-2 rounded bg-primary px-4 py-1 text-light"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditingBooking(null)}
                            className="ml-2 mt-2 rounded bg-gray-500 px-4 py-1 text-white hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

export default BookingsList;
