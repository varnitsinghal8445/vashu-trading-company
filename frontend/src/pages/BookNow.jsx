import PageWrapper from '../components/layout/PageWrapper';
import BookingWizard from '../components/booking/BookingWizard';

const BookNow = () => {
  return (
    <PageWrapper className="bg-gray-50 pt-32 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingWizard />
      </div>
    </PageWrapper>
  );
};

export default BookNow;