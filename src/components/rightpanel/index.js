import CakeIcon from '@material-ui/icons/Cake';

export default function rightpanel() {
  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      <div className="flex items-center pt-5 pr-5 mb-3 ">
        <CakeIcon className="mr-2" />
        <span className="text-base font-light">
          <b>Rachel Foster</b> and <b>4 other friends</b> have a birthday today
        </span>
      </div>
      <div className="w-full mb-5">
        <h2 className="text-3xl font-bold">Picture of the day</h2>
        <img
          src="./assets/posts/1.jpg"
          alt="pic of the day"
          className="object-contain w-full max-h-96"
        />
      </div>
      <div className="w-full mb-3">
        <h4 className="mb-5 font-bold">Online Friends</h4>
        <ul className="p-0 m-0 list-none">
          <li className="flex items-center mb-4">
            <div className="relative flex items-center mr-2">
              <img
                className="object-cover w-12 h-12 mr-1 rounded-full"
                src="assets/avatars/3.jpg"
                alt="3.jpg"
              />
              <span className="absolute w-4 h-4 border-2 border-white rounded-full -top-1 right-1 bg-green-online" />
            </div>
            <span className="font-medium">John Carter</span>
          </li>
          <li className="flex items-center mb-4">
            <div className="relative flex items-center mr-2">
              <img
                className="object-cover w-12 h-12 mr-1 rounded-full"
                src="assets/avatars/7.jpg"
                alt="7.jpg"
              />
              <span className="absolute w-4 h-4 border-2 border-white rounded-full -top-1 right-1 bg-red-offline" />
            </div>
            <span className="font-medium">Sally Croft</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
