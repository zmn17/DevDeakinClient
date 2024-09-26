import Header from "./Header";

const Home = () => {
  return (
    <div className="relative min-h-screen px-5 pt-5 bg-cover bg-home-bg">
      <div className="absolute inset-0 h-8/4 opacity-95 bg-gradient-to-b from-black via-black-800 to-transparent" />
      <div className="relative">
        <Header />
      </div>
      <div className="relative z-10 p-[5rem] text-center text-white flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold font-silk title-grad">
          Explore. Learn. Connect. Code.
        </h1>
        <p className="text-xl font-poppins w-[50rem] text-center">
          DEV@Deakin is your go-to source for the latest in technology, coding
          practices, and developer culture.
        </p>
      </div>
    </div>
  );
};

export default Home;
