import moment from 'moment';

export default class DateHelper
{
    /**
     * Преобразует строку даты в нужный формат.
     * 
     * @param  string date 
     * @param  string from 
     * @param  string to 
     * @return string
     */
    public static printFormatted(date: string, from: string = 'YYYY-MM-DD HH:mm:ss', to: string = 'DD.MM.YYYY HH:mm:ss'): string
    {
        return moment(date, from).format(to);
    }

}
