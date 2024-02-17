"use client";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WorkoutControlsProvider } from '@/contexts/WorkoutControlsContext';
import { WorkoutDataProvider } from '@/contexts/WorkoutDataContext';
import { SidebarProvider } from '@/contexts/SidebarContext'
import { ActivityModalProvider } from '@/contexts/ActivityModalContext';
import { ExerciseModalProvider } from '@/contexts/ExerciseModalContext';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className='flex flex-col grow'>
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark"
        themes={['light', 'dark']}
      >
          <WorkoutControlsProvider>
            <WorkoutDataProvider>
              <SidebarProvider>
                <ActivityModalProvider>
                  <ExerciseModalProvider>
                    {children}
                  </ExerciseModalProvider>
                </ActivityModalProvider>
              </SidebarProvider>
            </WorkoutDataProvider>
          </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
