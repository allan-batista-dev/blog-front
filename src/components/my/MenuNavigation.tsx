"use client";

import { ButtonTheme } from './ButtonTheme';
import SigninButton from './SigninButton';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { MenuCategorie } from './MenuCategorie';

export default function MenuNavigation() {

    return (
        <>
            <div className='grid grid-cols-3 justify-between items-center mb-10'>
                <div>
                    <Link href={"/"}>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
                            AllanDEV
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center justify-center gap-6'>
                    <div>
                        <MenuCategorie />
                    </div>
                    <div>
                        <Input placeholder='Pesquise...' />
                    </div>
                </div>
                <div className='flex gap-6  justify-end'>
                    <Button variant={"outline"}>
                        <Link href={"https://allan-dev-portfolio.vercel.app/"} target='_blank'>
                            Sobre mim
                        </Link>
                    </Button>
                    <SigninButton />
                    <ButtonTheme />
                </div>
            </div>
            <div>
                <Separator />
            </div>
        </>
    )
}