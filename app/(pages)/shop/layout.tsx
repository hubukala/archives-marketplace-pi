'use client'
import SideBar from '@/app/components/layout/sidebar/sidebar';
import { ShopWrapper } from './_components/style';
import { useState } from 'react';
// import { useState, useEffect } from 'react';
// import { getDocs, query, where, collection } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import MappingArray from '../shared/MapArray';
// import FilterArray from '../shared/FilterArray';
// import SideBar from '../components/SideBar';
// import { CategoryContent } from '../styles/CategoryContent';
// import { ProductsContainer } from '../styles/ProductsContainer';

export default function Shop({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // const [currentCategory, setCategory] = useState('All');
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const q = query(
    //             collection(db, 'products'),
    //             where('available', '==', true),
    //         );
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             setData((currentState) => [
    //                 ...currentState,
    //                 {
    //                     category: doc.data().category,
    //                     condition: doc.data().condition,
    //                     description: doc.data().description,
    //                     designer: doc.data().designer,
    //                     image: doc.data().images[0],
    //                     price: doc.data().price,
    //                     id: doc.data().product_id,
    //                     size: doc.data().size,
    //                     title: doc.data().title,
    //                 },
    //             ]);
    //         });
    //     };
    //     fetchData();
    // }, []);

    // const NewFilter = FilterArray(currentCategory, data);
    // const displayArray = MappingArray(NewFilter);

    const SIDEBAR_ITEMS = [
        {
            label: 'all',
            route: '/shop'
        },
        {
            label: 'tops',
            route: '/shop/tops'
        },
        {
            label: 'bottoms',
            route: '/shop/bottoms'
        },
        {
            label: 'sneakers',
            route: '/shop/sneakers'
        },
        {
            label: 'accessories',
            route: '/shop/accessories'
        },
    ]

    return (
        // <CategoryContent>
        <ShopWrapper>
            <SideBar
                sideBarItems={SIDEBAR_ITEMS}
            />
            {children}
            {/* <ProductsContainer>{displayArray}</ProductsContainer> */}
        </ShopWrapper>
        // </CategoryContent>
    );
};
