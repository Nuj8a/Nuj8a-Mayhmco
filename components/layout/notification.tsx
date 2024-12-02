import React from 'react';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

const Notification = () => {
  return (
    <div>
      <Button variant="ghost" className="rounded-full" size="icon">
        <Bell className="h-[1.2rem] w-[1.2rem] scale-95" />
        <span className="sr-only">Notification</span>
      </Button>
    </div>
  );
};

export default Notification;
