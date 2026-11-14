import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router";
import { HttpClient } from '../shared/http-client';

export function RegistrationConfirm() {
    const { registrationId } = useParams();
    const [isConfirmSuccessful, setIsConfirmSuccessful] = useState(false);

    useEffect(() => {
        confirmRegistration();
    }, []);

    function confirmRegistration() {
        HttpClient.patch<any>(`userAccess/userRegistrations/${registrationId}/confirm`, null)
            .then(() => setIsConfirmSuccessful(true));
    }

    return (
        <div>
            {isConfirmSuccessful &&
                <div>
                    Your registration is confirmed. You can log in to application.
                </div>
            }
        </div>
    )
}