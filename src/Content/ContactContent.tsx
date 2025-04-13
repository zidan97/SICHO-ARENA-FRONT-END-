import bg from "../../public/Contact/contactpage.jpg";

const ContactContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Image Section */}
      <div className="relative h-[60vh] bg-[url('/Contact/contactpage.jpg')] bg-cover bg-center flex items-center justify-start">
        <div className="bg-black/50 w-full h-full absolute"></div>
        <div className="relative z-10 p-6 lg:p-12">
          <p className="text-white text-sm md:text-base uppercase tracking-wide">
            We are here
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Contact us
          </h1>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-100 py-12 px-6 lg:px-24 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
          Get In Touch
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Looking to get in touch with <strong>Sicho Arena</strong>? We’d love
          to hear from you! Whether you have questions about our facilities,
          want to book a reservation, or just want to say hello, our friendly
          team is here to help. Contact us today through our website or by phone
          and let us assist you in any way we can. We look forward to hearing
          from you!
        </p>
      </div>
    </div>
  );
};

export default ContactContent;
