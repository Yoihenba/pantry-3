// 'use client';
// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, getDoc,QuerySnapshot,query,onSnapshotdeleteDoc,doc } from 'firebase/firestore';
// import { db } from './firebase';

// function Page() {
//   const [items, setItems] = useState([
//     // { name: 'Coffee', quantity: 2 },
//     // { name: 'Apple', quantity: 1 },
//     // { name: 'Mango', quantity: 3 },
//   ]);

//   const [newItem, setNewItem] = useState({ name: '', quantity: '' });
//   const [total, setTotal] = useState(0);

//   const addItem = async (e) => {
//     e.preventDefault();
//     if (newItem.name !== '' && newItem.quantity !== '') {
//       // Add the new item to Firestore
//       await addDoc(collection(db, 'items'), {
//         name: newItem.name.trim(),
//         quantity: parseInt(newItem.quantity),
//       });
//       // Add the new item to local state
//       setItems([...items, newItem]);
//       // Reset the newItem state
//       setNewItem({ name: '', quantity: '' });
//     }
//   };

//   // const deleteItem = (id) => {
//   //   const updatedItems = items.filter((_, index) => index !== id);
//   //   setItems(updatedItems);
//   // };

//   useEffect(() => {
//     const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
//     setTotal(totalQuantity);
//   }, [items]);

//   useEffect(() => {
//     const q = query(collection(db, 'items'));
    
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let itemsArr = [];
      
//       querySnapshot.forEach((doc) => {
//         itemsArr.push({ ...doc.data(), id: doc.id });
//       });
      
//       setItems(itemsArr);
//       // Make sure the variable name matches exactly
//       const calculateTotal = ()=>{
//         const totalPrice = itemsArr.reduce(
//           (sum,item) => sum + parseFloat(item.price),0
//         );
//         setTotal(totalPrice);
//       };
//       calculateTotal();
//       return () =>unsubscribe();
//     });
  
//     // Cleanup subscription on unmount
//     // return () => unsubscribe();
//   }, []);


//   const deleteItem= async(id) => {
//     await deleteDoc(doc(db,'items',id));
//   };

  

//   return (
//     <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-24'>
//       <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
//         <h1 className='text-4xl p-4 text-center'>Pantry Tracker</h1>
      
//         <div className='bg-slate-800 p-4 rounded-lg'>
//           <form className='grid grid-cols-1 gap-4 text-black' onSubmit={addItem}>
//             <input 
//               value={newItem.name} 
//               onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
//               className='p-3 border' 
//               type="text" 
//               placeholder='Enter item' 
//             />
//             <input 
//               value={newItem.quantity} 
//               onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} 
//               className='p-3 border' 
//               type="number" 
//               placeholder='Enter quantity' 
//             />
//             <button className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl' type="submit">+</button>
//           </form>
//           <ul>
//             {items.map((item, id) => (
//               <li key={id} className='my-4 w-full flex justify-between'>
//                 <div className='p-4 w-full flex justify-between'>
//                   <span className='capitalize'>{item.name}</span>
//                   <span>{item.quantity}</span>
//                 </div>
//                 <button 
//                   onClick={() => deleteItem(item.id)} 
//                   className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'>
//                   X
//                 </button>
//               </li>
//             ))}
//           </ul>
//           {items.length > 0 && (
//             <div className='flex justify-between p-3'>
//               <span>Total</span>
//               <span>{total}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Page;




'use client';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function Page() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: parseInt(newItem.quantity),
      });
      setNewItem({ name: '', quantity: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'items'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      
      setItems(itemsArr);

      const totalQuantity = itemsArr.reduce((acc, item) => acc + item.quantity, 0);
      setTotal(totalQuantity);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl p-4 text-center'>Pantry Tracker</h1>
      
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-1 gap-4 text-black' onSubmit={addItem}>
            <input 
              value={newItem.name} 
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
              className='p-3 border' 
              type="text" 
              placeholder='Enter item' 
            />
            <input 
              value={newItem.quantity} 
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} 
              className='p-3 border' 
              type="number" 
              placeholder='Enter quantity' 
            />
            <button className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl' type="submit">+</button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between'>
                <div className='text-white p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)} 
                  className='text-white ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'>
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div className='text-white flex justify-between p-3'>
              <span>Total</span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Page;
