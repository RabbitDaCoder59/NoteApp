import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Required for routing
import { vi } from 'vitest';
import Notes from '../../src/pages/Notes'; // Adjust the path based on your file structure
import { NotesContext } from '../../src/context/NotesContext'; // Assuming NotesContext is in this path
import axios from 'axios';
import { toast } from 'react-toastify'; // Add this import statement


// Mock axios
vi.mock('axios');

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

// Mocking the NotesContext
const mockFetchNotes = vi.fn();


describe('Notes Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.getItem.mockReturnValue('mockAccessToken'); // Mock access token in localStorage
  });
  it('renders note details correctly', async () => {
    axios.get.mockResolvedValue({
      data: { title: 'Test Note', content: 'This is a testing note content' },
    });
  
    render(
      <Router>
        <NotesContext.Provider value={{ fetchNotes: mockFetchNotes }}>
          <Notes />
        </NotesContext.Provider>
      </Router>
    );
  
    // Wait for the title to be rendered
    await waitFor(() => screen.getByPlaceholderText(/Title/i));
    
    // Check if the title textarea has the correct value
    expect(screen.getByPlaceholderText(/Title/i).value).toBe('Test Note');
    
    // Check if the content textarea has the correct value
    expect(screen.getByPlaceholderText(/Type something.../i).value).toBe('This is a testing note content');
  });
  
  it('handles edit button click and makes textarea editable', async () => {
    // Mock the API response
    axios.get.mockResolvedValue({
      data: { title: 'Test Note', content: 'This is a testing note content' },
    });
  
    render(
      <Router>
        <NotesContext.Provider value={{ fetchNotes: mockFetchNotes }}>
          <Notes />
        </NotesContext.Provider>
      </Router>
    );
  
    // Wait for the title textarea to be rendered
    const titleTextArea = await screen.findByPlaceholderText(/Title/i);
  
    // Initially, the title textarea should be read-only
    expect(titleTextArea).toHaveAttribute('readonly');
  
    // Click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i }); // Looks for button with aria-label "edit"
    fireEvent.click(editButton);
  
    // Wait for the title textarea to become editable (readonly should be removed)
    await waitFor(() => expect(titleTextArea).not.toHaveAttribute('readonly'));
  });
  

  it('handles save button click', async () => {
    axios.get.mockResolvedValue({
      data: { title: 'Test Note', content: 'This is a testing note content' },
    });
    axios.put.mockResolvedValue({});

    render(
      <Router>
        <NotesContext.Provider value={{ fetchNotes: mockFetchNotes }}>
          <Notes />
        </NotesContext.Provider>
      </Router>
    );

    await waitFor(() => screen.getByText(/Test Note/i));

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Title' } });

    // Click the save button
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    // Check if axios.put was called with the correct data
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3001/notes/note/undefined', // Replace undefined with actual id if required
        { title: 'Updated Title', content: 'This is a testing note content' },
        expect.objectContaining({
          headers: { Authorization: 'Bearer mockAccessToken' },
        })
      );
    });
  });

  it('handles delete button click', async () => {
    axios.get.mockResolvedValue({
      data: { title: 'Test Note', content: 'This is a testing note content' },
    });
    axios.delete.mockResolvedValue({});

    render(
      <Router>
        <NotesContext.Provider value={{ fetchNotes: mockFetchNotes }}>
          <Notes />
        </NotesContext.Provider>
      </Router>
    );

    await waitFor(() => screen.getByText(/Test Note/i));

    // Click the delete button
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Check if axios.delete was called
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:3001/notes/note/undefined', // Replace undefined with actual id if required
        expect.objectContaining({
          headers: { Authorization: 'Bearer mockAccessToken' },
        })
      );
    });
  });

  it('shows toast on successful save', async () => {
    axios.get.mockResolvedValue({
      data: { title: 'Test Note', content: 'This is a testing note content' },
    });
    axios.put.mockResolvedValue({});
    const toastSuccessSpy = vi.spyOn(toast, 'success');

    render(
      <Router>
        <NotesContext.Provider value={{ fetchNotes: mockFetchNotes }}>
          <Notes />
        </NotesContext.Provider>
      </Router>
    );

    await waitFor(() => screen.getByText(/Test Note/i));

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Title' } });

    // Click the save button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Check if toast.success was called
    await waitFor(() => {
      expect(toastSuccessSpy).toHaveBeenCalledWith('Note saved successfully!');
    });
  });
});
