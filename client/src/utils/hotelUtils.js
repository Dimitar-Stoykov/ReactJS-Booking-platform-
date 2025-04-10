export const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];


export const calculateBookingInfo = (localCheckIn, localCheckOut, price) => {
        if (!localCheckIn || !localCheckOut) return null;

        const start = new Date(localCheckIn);
        const end = new Date(localCheckOut);
        const days = Math.round((end - start) / (1000 * 60 * 60 * 24));

        return days > 0 ? { days, total: days * price } : null;
    };
