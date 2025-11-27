export function DateDisplay({ dateString }: { dateString: string }) {
  const formatDate = (dateString: string): string => {
    // Add T00:00:00 to the string forcibly sets the
    // clock to use midnight of the local timezone.
    const date = new Date(`${dateString}T00:00:00`);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    return date.toLocaleDateString('en-GB', options);
  };

  return <p className="font-medium">{formatDate(dateString)}</p>;
}
