import { format } from "date-fns";
import { Linking } from "react-native";

export const toTitlecase = (str: string | null | undefined) => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
    return "NA";
};

export const call = (num: number | string) => {
    Linking.openURL(`tel:${num}`);
};

export const whatsapp = (mobile_number: number | string) => {
    Linking.openURL(`https://wa.me/+91${mobile_number}?text=${"नमस्ते"}`);
};

export const encode = (value: any) => {
    return JSON.stringify(value);
};

export const decode = (value: any) => {
    return JSON.parse(value);
};

export const convertDateToYYYYMMDD = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

export const to12Hr = (date: Date) => {
    return format(date, 'hh:mm aa');
}