/* eslint-disable no-nested-ternary */
// import CakeIcon from '@material-ui/icons/Cake';
import { PROFILES_FOLDER, DEFAULT_AVATAR } from '../constants/const';

export default function RightPanelProfile({ user }) {
  return (
    <>
      <div className="w-full min-h-full p-3 overflow-y-scroll">
        <h1 className="mb-1 text-4xl font-medium">User information title</h1>
        <div className="mb-4">
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">City:</span>
            <span className="font-normal">{user.city !== '' ? user.city : '-'}</span>
          </div>
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">From:</span>
            <span className="font-normal">{user.from !== '' ? user.from : '-'}</span>
          </div>
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">Relationship:</span>
            <span className="font-normal">
              {user.relatioship === 0
                ? 'Complicated'
                : user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'In Relationship'
                : user.relationship === 3
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <p className="mb-1 text-4xl font-medium">User Friends</p>
        <div className="flex flex-wrap items-center">
          <div className="flex-col items-center mb-4 mr-4">
            <img
              src={DEFAULT_AVATAR}
              alt="name"
              className="object-cover w-32 h-32 rounded-lg cursor-pointer"
            />
            <span className="text-base font-medium">Sarah Jane</span>
          </div>
        </div>
      </div>
    </>
  );
}
