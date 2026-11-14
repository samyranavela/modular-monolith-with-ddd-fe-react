import { useEffect, useState } from 'react';
import './App.css';
import { LoginControl } from './login/login-control';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router';
import { MyMeetingsGroups } from './meetings/my-meeting-groups/my-meetings-groups';
import { CreateMeetingGroup } from './meetings/my-meeting-groups/create-meeting-group';
import { AdministrationMeetingGroupProposalsList } from './administration/MeetingGroupProposals/meeting-group-proposals-list';
import { SubscriptionBuy } from './payments/subscriptions/subscription-buy';
import { MeetingGroupDetails } from './meetings/meeting-groups/meeting-group-details';
import { CreateMeeting } from './meetings/create-meeting';
import { MeetingDetails } from './meetings/meeting-details';
import { UserRegistrationForm } from './user-registration/user-registration-form';
import { AllEmailsList } from './emails/all-emails-list';
import { RegistrationConfirm } from './user-registration/registration-confirm';
import { AllMeetingGrups } from './meetings/meeting-groups/all-meeting-groups';
import { MyMeetings } from './meetings/my-meetings/my-meetings';
import { AuthenticationService } from './login/authentication/authentication-service';
import { HttpClient } from './shared/http-client';
import { SubscriptionDetails } from './payments/subscriptions/subscription-details';
import { SubscriptionPaymentStatus } from './payments/subscriptions/subscription-payment-status';
import { SubscriptionPaymentSuccess } from './payments/subscriptions/subscription-payment-success';


interface Permission {
    code: string;
}


function App() {

    const [permissions, setPermissions] = useState<Array<Permission>>([]);

    useEffect(() => {
        loadPermissions();
    }, []);

    function loadPermissions() {
        const isAuthenticated = AuthenticationService.isAuthenticated();

        if (isAuthenticated) {
            HttpClient.get<Array<Permission>>('api/userAccess/authenticatedUser/permissions')
                .then(response => setPermissions(response));
        }
    }

    function isAuthenticated(): boolean {
        return AuthenticationService.isAuthenticated();
    }

    function hasPermission(permission: string): boolean {
        return permissions.map(x => x.code).includes(permission);
    }

    return (
        <div className="App">
            <header className="App-header">


                <LoginControl />

                <Router>
                    <div className="container">
                        <div id="menu">

                            <span><Link to="/">Home</Link></span>

                            {hasPermission('MyMeetingsGroupsView') &&
                                <span><Link to="/my-meeting-groups">My Meeting Groups</Link></span>
                            }

                            {hasPermission('MyMeetingsView') &&
                                <span><Link to="/my-meetings">My Meetings</Link></span>
                            }

                            {hasPermission('AllMeetingGroupsView') &&
                                <span><Link to="/meeting-groups">Explore Meeting Groups</Link></span>
                            }

                            {hasPermission('AdministrationsView') &&
                                <span><Link to="/administration/meetingGroupProposals">Administration</Link></span>
                            }

                            {hasPermission('SubscriptionView') &&
                                <span><Link to="/subscription">Subscription</Link></span>
                            }

                            {!isAuthenticated() &&
                                <span><Link to="/register">Registration</Link></span>
                            }


                            <span><Link to="/emails">Emails</Link></span>

                        </div>

                        <Routes>
                        <Route path="/my-meeting-groups" element={<MyMeetingsGroups/>} />
                        <Route path="/meeting-groups" element={<AllMeetingGrups/>} />
                        <Route path="/meeting-groups-create" element={<CreateMeetingGroup/>} />
                        <Route path="/meeting-groups/:meetingGroupId/meetings/create" element={<CreateMeeting/>} />
                        <Route path="/meeting-groups/:meetingGroupId" element={<MeetingGroupDetails/>} />
                        <Route path="/subscription" element={<SubscriptionDetails/>} />
                        <Route path="/subscription/buy" element={<SubscriptionBuy/>} />
                        <Route path="/subscription/payment-status" element={<SubscriptionPaymentStatus/>} />
                        <Route path="/subscription/payment-success" element={<SubscriptionPaymentSuccess/>} />
                        <Route path="/administration/meetingGroupProposals" element={<AdministrationMeetingGroupProposalsList/>} />
                        <Route path="/my-meetings" element={<MyMeetings/>} />
                        <Route path="/meetings/:meetingId" element={<MeetingDetails/>} />
                        <Route path="/register" element={<UserRegistrationForm/>} />
                        <Route path="/emails" element={<AllEmailsList/>} />
                        <Route path="/registration-confirm/:registrationId" element={<RegistrationConfirm/>} />
                        </Routes>
                    </div>
                </Router>

            </header>
        </div>
    );
}

export default App;
