import play from "../../public/About/PLAY.jpg";

const AboutContent = () => {
  return (
    <div className=" mt-4 grid grid-cols-2 gap-4">
      {/* image body */}
      <div className="  p-2">
        <img src={play} />
      </div>

      {/* Text Content */}
      <div className="w-3/4 ">
        <h1 className="text-blue-600 text-6xl text font-bold">
          About Our Arena
        </h1>
        <p className="border rounded-md p-8 border-blue-200 border-b-2 mt-4  text-gray-600">
          Our sports arena is a state-of-the-art facility designed for sports
          enthusiasts of all ages. It features world-class amenities for
          cricket, football, badminton, and basketball, along with exciting
          activities like paintball, VR games, laser tag, and karaoke. The PS5
          Zone delivers the latest gaming experiences, while other indoor
          attractions ensure continuous entertainment. With modern
          infrastructure, premium equipment, and experienced trainers, the arena
          offers the perfect destination for sports lovers seeking both fun and
          challenge.
        </p>
      </div>
    </div>
  );
};

export default AboutContent;
