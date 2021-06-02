import { DEFAULT_AVATAR } from '../../constants/const';

export default function ChatOnline() {
  return (
    <div className="flex items-center hover:bg-blue-medium rounded-lg cursor-pointer mb-2">
      <div className="relative">
        <img className="h-12 w-12 rounded-full mr-2 object-cover" src={DEFAULT_AVATAR} alt="" />
        <span className="absolute top-0 right-2 w-4 h-4 border-2 border-white rounded-full bg-green-online" />
      </div>
      <span className="font-medium">Name</span>
    </div>
  );
}
