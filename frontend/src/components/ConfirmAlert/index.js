import { confirmAlert } from 'react-confirm-alert';

import { toast } from 'react-toastify';
import api from '~/services/api';
// import { confirmAlertt } from './styles';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import './teste.css';

async function handleDelete(route, id) {
  try {
    await api.delete(`${route}/${id}`);
    toast.success('Item deleted successfully!');
  } catch (err) {
    toast.error('Something went wrong!');
  }
}

export default function ConfirmAlert(route, param) {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you want to delete this item?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => handleDelete(route, param)
      },
      {
        label: 'No'
      }
    ]
  });
}

// export default function ConfirmAlert(route, param) {
//   confirmAlertt({
//     customUI: ({ onClose }) => {
//       return (
//         <div className="custom-ui">
//           <h1>Are you sure?</h1>
//           <p>You want to delete this file?</p>
//           <button type="button" onClick={onClose}>
//             No
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               this.handleClickDelete();
//               onClose();
//             }}
//           >
//             Yes, Delete it!
//           </button>
//         </div>
//       );
//     }
//   });
// }
