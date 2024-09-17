import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { buttonTheme } from '../../utils/customTheme';

export function DefaultButton({ className, type, color, onClick, children }) {
    return (
        <Button
            className={className}
            type={type}
            theme={buttonTheme}
            color={color ?? 'customYellow'}
            onClick={onClick}
        >
            <div className="flex items-center">{children}</div>
        </Button>
    );
}

export function LinkButton({ to, className, color, children }) {
    return (
        <Link className={className} to={to}>
            <Button
                className="w-full"
                theme={buttonTheme}
                color={color ?? 'customYellow'}
            >
                <div className="flex items-center">{children}</div>
            </Button>
        </Link>
    );
}
