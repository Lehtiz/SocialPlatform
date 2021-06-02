import { formatDistanceToNow, parseISO } from 'date-fns';
import { DEFAULT_AVATAR } from '../../constants/const';

export default function Message({ owner, message }) {
  return (
    <div className={`flex flex-col p-2 ${owner ? 'items-end' : ''}`}>
      <div className="flex items-center">
        <div className="flex flex-col items-center justify-center mr-2">
          <img className="h-10 w-10 rounded-full object-cover" src={DEFAULT_AVATAR} alt="" />
        </div>
        <div
          className={`p-2 rounded-lg min-h-full max-w-xl ${
            owner ? 'bg-message-send text-black' : 'bg-message-receive text-white'
          }`}
        >
          <div className="items-center">{message.text}</div>
          <div className="text-sm font-light opacity-70">
            {formatDistanceToNow(parseISO(message.createdAt), {
              includeSeconds: true,
              addSuffix: true
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
