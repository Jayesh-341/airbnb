'use client'

import { signIn } from "next-auth/react";
import React from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'; 

import useRegisterModal from '@/app/hooks/useRegisterModel';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
// import ToasterProvider from '@/app/providers/ToasterProvider';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [ isLoading , setIsLoading ] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues: {
            // name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        signIn('credentials' , {
            // we are accessing data means email and body 
            ...data,
            // and there is no need of redirect
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?. error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back"
                subtitle="Login to your account!"
                center
            />
            <Input 
             id="email"
             label="Email"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
            />
            {/* <Input 
             id="name"
             label="Name"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
            /> */}
            <Input 
             id="password"
             type="password"
             label="password"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
            />
        </div>
    );
        const footerContent = (
            <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={ () => {}}
            /> 
            <Button 
                outline 
                label = "Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div 
                className='
                 text-neutral-500
                 text-center
                 mt-4
                 font-light
                 '
            >
                <div className='flex flex-row items-center gap-2'>
                <div>
                    Already have an account?
                </div>  
                <div
                onClick={registerModal.onClose}
                className='
                text-neutral-800
                cursor-pointer
                hover:underline
                '>
                    Log in
                </div>      
            </div>
            </div>
        
            </div>
        )
   
    return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer = {footerContent}
        />
    );
}
export default LoginModal;