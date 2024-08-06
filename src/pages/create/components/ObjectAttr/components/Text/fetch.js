import useSWR from "swr";
import {getFontManage} from "../../../../../../api/text";

export const useFontList = () => {
    const {data} = useSWR('useFontList', getFontManage)
    return {
        data: data || []
    }
}
