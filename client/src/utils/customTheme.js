export const navbarTheme = {
    link: {
        active: {
            on: 'bg-[#f8c301] text-gray-800 md:bg-transparent md:text-[#f8c301] drop-shadow-sm',
            off: 'text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#f8c301] drop-shadow-sm',
        },
    },
};

export const buttonTheme = {
    color: {
        customYellow: 'bg-[#f8c301] hover:bg-[#d6a800]',
    },
};

export const spinnerTheme = {
    color: {
        customYellow: 'fill-[#f8c301]',
    },
    size: {
        xxl: 'h-12 w-12',
    },
};

export const datepickerTheme = {
    popup: {
        footer: {
            base: 'mt-2 flex space-x-2',
            button: {
                base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-[#f8c301]',
                today: 'bg-[#f8c301] text-gray-800 hover:bg-[#d6a800]',
            },
        },
    },
    views: {
        days: {
            items: {
                base: 'grid w-64 grid-cols-7',
                item: {
                    selected: 'bg-[#f8c301] text-gray-800 hover:bg-[#d6a800]',
                },
            },
        },
        months: {
            items: {
                item: {
                    selected: 'bg-[#f8c301] text-gray-800 hover:bg-[#d6a800]',
                },
            },
        },
        years: {
            items: {
                item: {
                    selected: 'bg-[#f8c301] text-gray-800 hover:bg-[#d6a800]',
                },
            },
        },
        decades: {
            items: {
                item: {
                    selected: 'bg-[#f8c301] text-gray-800 hover:bg-[#d6a800]',
                },
            },
        },
    },
};
