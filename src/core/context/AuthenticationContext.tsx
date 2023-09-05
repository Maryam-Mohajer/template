"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { clearStorage, getItem } from "../services/storage/storage.service";
import jwt_decode from "jwt-decode";
import Spinner from "@/components/common/Spinner/Spinner";

type Props = {
    children: any;
};

interface IUserInfo {
    firstName: string,
    lastName: string,
    userId: number,
}

export interface IAuthInfo {
    token: string;
    userInfo: IUserInfo;
    roles: string[];
    setUserInfoState: React.Dispatch<React.SetStateAction<IUserInfo>>;
    setTokenState: React.Dispatch<React.SetStateAction<string>>;
    setRoleState: React.Dispatch<React.SetStateAction<string[]>>;
    isAuthenticated: () => boolean;
    resetAuthContext: () => void;
    logOut: () => void;
}

const AuthenticationContext = createContext<IAuthInfo | null>(null);

const token: any =
    getItem("token") && getItem("token") !== "undefined" ? getItem("token") : "";

const initialUserInfoState: IUserInfo = {
    firstName: "",
    lastName: "",
    userId: 0,
};

export const AuthenticationContextProvider = ({ children }: Props) => {
    const [userInfoState, setUserInfoState] = useState<IUserInfo>({
        firstName: "",
        lastName: "",
        userId: 0,
    });
    const [tokenState, setTokenState] = useState<string>(token);
    const [roleState, setRoleState] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isAuthenticated = () => {
        if (token) {
            return true;
        }
        return false;
    };

    const resetAuthContext = () => {
        setUserInfoState(initialUserInfoState);
        setTokenState("");
        setRoleState([""]);
    };

    const logOut = () => {
        clearStorage();
        setUserInfoState({
            firstName: "",
            lastName: "",
            userId: 0,
        });
        setTokenState("");
        setRoleState([]);
        window.location.pathname = "/";
    };

    const getData = async () => {
        try {
            const decodedToken: any = jwt_decode(token);
            setUserInfoState({
                firstName: decodedToken.first_name,
                lastName: decodedToken.last_name,
                userId: decodedToken.user_id,
            });
            setRoleState(decodedToken.role);
            setIsLoading(false);

        } catch (error) {

        }
    }

    useEffect(() => {
        token ? getData() : setIsLoading(false)
    }, []);


    return (
        <AuthenticationContext.Provider
            value={{
                token: tokenState,
                userInfo: userInfoState,
                roles: roleState,
                setUserInfoState,
                setTokenState,
                setRoleState,
                isAuthenticated,
                resetAuthContext,
                logOut,
            }}
        >
           {isLoading ? <Spinner /> : children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
