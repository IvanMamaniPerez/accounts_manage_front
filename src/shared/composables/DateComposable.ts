export const useDateComposable = () => {
  enum DateFormats {
    DATE = 'yyyy-MM-dd',
    DATE_TIME = 'yyyy-MM-dd HH:mm:ss',
  }
  function getUTCDateTime(format: DateFormats): string {
    const currentDate = new Date().toISOString();
    if (format === DateFormats.DATE) {
      return currentDate.split('T')[0];
    }
    if (format === DateFormats.DATE_TIME) {
      return currentDate.replace('T', ' ').split('.')[0];
    }
    return currentDate;
  }

  function isMayorThan(date: string, dateToCompare: string): boolean {
    return new Date(date) > new Date(dateToCompare);
  }

  function isMinorThan(date: string, dateToCompare: string): boolean {
    return new Date(date) < new Date(dateToCompare);
  }

  function isEquals(date: string, dateToCompare: string): boolean {
    return new Date(date) === new Date(dateToCompare);
  }

  function subSeconds(date: string, seconds: number): string {
    const newDate = new Date(date);
    newDate.setSeconds(newDate.getSeconds() - seconds);
    return newDate.toISOString();
  }

  function subMinutes(date: string, minutes: number): string {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - minutes);
    return newDate.toISOString();
  } 

  function subHours(date: string, hours: number): string {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - hours);
    return newDate.toISOString();
  }

  function addSeconds(date: string, seconds: number): string {
    const newDate = new Date(date);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate.toISOString();
  }

  function addMinutes(date: string, minutes: number): string {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate.toISOString();
  }

  function addHours(date: string, hours: number): string {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate.toISOString();
  }

  function getDiferenceInMinutes(date: string, dateToCompare: string): number {
    const diff = new Date(date).getTime() - new Date(dateToCompare).getTime();
    return Math.abs(Math.round(diff / 60000));
  }

  function getDiferenceInSeconds(date: string, dateToCompare: string): number {
    const diff = new Date(date).getTime() - new Date(dateToCompare).getTime();
    return Math.abs(Math.round(diff / 1000));
  }

  return {
    DateFormats,
    getUTCDateTime,
    isMayorThan,
    isMinorThan,
    isEquals,
    subSeconds,
    subMinutes,
    subHours,
    addSeconds,
    addMinutes,
    addHours,
    getDiferenceInMinutes,
    getDiferenceInSeconds,
  }
}
