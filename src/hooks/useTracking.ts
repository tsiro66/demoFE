import axios from 'axios';
import { useCallback } from 'react';
import type { EventPayload } from '../types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

export const useTracking = () => {
    
    /**
     * @param eventName The name of the event
     * @param payload Optional data to send with the event
     */
    const trackEvent = useCallback((eventName: string, payload: Record<string, unknown> = {}) => {
        
        const eventData: EventPayload = {
            eventName: eventName,
            payload: payload,
            timestamp: new Date().toISOString()
        };

        console.log(`[Tracking Event]: ${eventName}`, eventData);

        // We don't await this or handle errors because analytics should not block the user's main action (like placing an order)
        apiClient.post('/tracking/event', eventData)
            .catch(err => {
                console.warn('Analytics event failed to send:', err.message);
            });
            
    }, []);

    return trackEvent;
};