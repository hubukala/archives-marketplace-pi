'use client'
import { useEffect, useState } from 'react';

// import { TextArea } from '../styles/account-details/TextArea';
import { TextArea } from '@/app/components/ui/text-area/style';

// import { Input } from '../styles/account-details/Input';
import { Input } from '@/app/components/ui/input/style';

// import { AccountInputLabel } from '../styles/account-details/AccountInputLabel.js';
import { AccountInputLabel } from './style';

// import { AccountInfoRow } from '../styles/account-details/AccountInfoRow';
// import { AccountInfoInputWrapper } from '../styles/account-details/AccountInfoInputWrapper';
import { AccountInfoForm ,AccountInfoRow, AccountInfoInputWrapper } from './style';

// import { ButtonContainer } from '../styles/account-details/ButtonContainer';
// import { db } from '../firebaseConfig';
// import { setDoc, doc, getDoc } from 'firebase/firestore';
// import { auth } from '../firebaseConfig';

// import { ButtonSecondary } from '../styles/shared/buttons/ButtonSecondary';
import Button from '@/app/components/ui/button/button';


const AccountDetailsForm = () => {
    const [data, setData] = useState({
        fname: '',
        lname: '',
        bio: '',
        city: '',
        zipcode: '',
        street: '',
        suite: '',
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const userId = auth?.currentUser?.uid;
    //         const docRef = doc(db, 'users', userId);
    //         const docSnap = await getDoc(docRef);
    //         console.log('Document data:', docSnap.data());
    //         setData({
    //             avatar: docSnap.data().avatar ?? '',
    //             fname: docSnap.data().fname ?? '',
    //             lname: docSnap.data().lname ?? '',
    //             bio: docSnap.data().bio ?? '',
    //             city: docSnap.data().city ?? '',
    //             zipcode: docSnap.data().zipcode ?? '',
    //             street: docSnap.data().street ?? '',
    //             suite: docSnap.data().suite ?? '',
    //         });
    //     };
    //     fetchData();
    // }, []);

    // const handleAdd = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await setDoc(doc(db, 'users', auth.currentUser.uid), {
    //             ...data,
    //         });
    //         alert('dane zaaktualizowane pomyślnie');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value };

        setData({ ...data, ...inputs });
    };

    return (
        <AccountInfoForm action="">
            <AccountInfoRow>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>First name</AccountInputLabel>
                    <Input
                        name="fname"
                        type="text"
                        onChange={handleInputs}
                        value={data.fname}
                    />
                </AccountInfoInputWrapper>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>Last name</AccountInputLabel>
                    <Input
                        name="lname"
                        type="text"
                        onChange={handleInputs}
                        value={data.lname}
                    />
                </AccountInfoInputWrapper>
            </AccountInfoRow>
            <AccountInfoRow>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>Bio</AccountInputLabel>
                    <TextArea
                        name="bio"
                        type="text"
                        onChange={handleInputs}
                        value={data.bio}
                    />
                </AccountInfoInputWrapper>
            </AccountInfoRow>
            <AccountInfoRow>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>City</AccountInputLabel>
                    <Input
                        name="city"
                        type="text"
                        onChange={handleInputs}
                        value={data.city}
                    />
                </AccountInfoInputWrapper>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>ZIP code</AccountInputLabel>
                    <Input
                        name="zipcode"
                        type="text"
                        onChange={handleInputs}
                        value={data.zipcode}
                    />
                </AccountInfoInputWrapper>
            </AccountInfoRow>
            <AccountInfoRow>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>Street adress</AccountInputLabel>
                    <Input
                        name="street"
                        type="text"
                        onChange={handleInputs}
                        value={data.street}
                    />
                </AccountInfoInputWrapper>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>Apt/Suite</AccountInputLabel>
                    <Input
                        name="suite"
                        type="text"
                        onChange={handleInputs}
                        value={data.suite}
                    />
                </AccountInfoInputWrapper>
            </AccountInfoRow>
            {/* <ButtonContainer> */}
            <div>
                <Button variant="primary" onClick={() => console.log('save clicked')} label='SAVE' />
            </div>
            {/* </ButtonContainer> */}
        </AccountInfoForm>
    );
};

export default AccountDetailsForm;
