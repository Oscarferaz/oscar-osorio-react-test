
import { logout } from '@/redux/states';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

interface PropAutoLogout {
    children: React.ReactNode
}

const AutoLogout: React.FC<PropAutoLogout> = ({ children })=> {

    const dispatch = useDispatch()

    const [, , removeCookie] = useCookies(['auth'])

    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleLogout, 5 * 60 * 1000); 
    };


    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click'];

        events.forEach(event => {
            window.addEventListener(event, resetTimeout);
        });

        resetTimeout();

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, resetTimeout);
            });
            clearTimeout(timeoutId);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout())
        removeCookie('auth', { path: '/' });
    }

    return <>{children}</>

}

export default AutoLogout