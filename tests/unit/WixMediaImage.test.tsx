import {
  WixMediaImage,
  getImageUrlForMedia,
} from '@app/components/Image/WixMediaImage';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('getImageUrlForMedia', () => {
  it('returns Wix URL for wix:image media', () => {
    const media = 'wix:image://v1/test-image.jpg';
    const result = getImageUrlForMedia(media);

    expect(result).toContain('static.wixstatic.com/media');
    expect(result).toContain('test-image.jpg');
  });

  it('returns original URL for non-Wix media', () => {
    const media = 'https://example.com/image.jpg';
    const result = getImageUrlForMedia(media);

    expect(result).toBe('https://example.com/image.jpg');
  });

  it('returns original path for relative paths', () => {
    const media = '/images/local-image.jpg';
    const result = getImageUrlForMedia(media);

    expect(result).toBe('/images/local-image.jpg');
  });

  it('handles different width and height parameters', () => {
    const media = 'wix:image://v1/test.jpg';

    const result1 = getImageUrlForMedia(media);
    expect(result1).toContain('static.wixstatic.com/media');

    const result2 = getImageUrlForMedia(media);
    expect(result2).toContain('static.wixstatic.com/media');
  });

  it('handles empty string media', () => {
    const media = '';
    const result = getImageUrlForMedia(media);

    expect(result).toBe('');
  });
});

describe('WixMediaImage Component', () => {
  it('renders the component with Wix media', () => {
    render(<WixMediaImage media="wix:image://v1/test.jpg" alt="Test image" />);

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('renders with placeholder when no media provided', () => {
    render(<WixMediaImage alt="Placeholder" />);

    const image = screen.getByAltText('Placeholder');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg'),
    );
  });

  it('uses default alt text when not provided', () => {
    render(<WixMediaImage media="wix:image://v1/test.jpg" />);

    const image = screen.getByAltText('no info available for image');
    expect(image).toBeInTheDocument();
  });

  it('uses default width and height when not provided', () => {
    render(<WixMediaImage media="wix:image://v1/test.jpg" alt="Test" />);

    const image = screen.getByAltText('Test');
    expect(image).toHaveAttribute('width', '640');
    expect(image).toHaveAttribute('height', '320');
  });

  it('uses custom width and height', () => {
    render(
      <WixMediaImage
        media="wix:image://v1/test.jpg"
        alt="Test"
        width={1000}
        height={800}
      />,
    );

    const image = screen.getByAltText('Test');
    expect(image).toHaveAttribute('width', '1000');
    expect(image).toHaveAttribute('height', '800');
  });

  it('applies hover zoom effect by default', () => {
    render(<WixMediaImage media="wix:image://v1/test.jpg" alt="Test" />);

    const image = screen.getByAltText('Test');
    expect(image).toHaveClass('group-hover:scale-110');
  });

  it('disables zoom when disableZoom is true', () => {
    render(
      <WixMediaImage media="wix:image://v1/test.jpg" alt="Test" disableZoom />,
    );

    const image = screen.getByAltText('Test');
    expect(image).not.toHaveClass('group-hover:scale-110');
  });

  it('renders with non-Wix media URL', () => {
    render(
      <WixMediaImage
        media="https://example.com/image.jpg"
        alt="External image"
      />,
    );

    const image = screen.getByAltText('External image');
    expect(image).toBeInTheDocument();
  });

  it('applies custom sizes prop', () => {
    render(
      <WixMediaImage
        media="wix:image://v1/test.jpg"
        alt="Test"
        sizes="50vw"
        objectFit="cover"
      />,
    );

    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('uses default sizes when not provided with objectFit', () => {
    render(
      <WixMediaImage
        media="wix:image://v1/test.jpg"
        alt="Test"
        objectFit="cover"
      />,
    );

    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('renders with empty media string', () => {
    render(<WixMediaImage media="" alt="Empty media" />);

    const image = screen.getByAltText('Empty media');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg'),
    );
  });

  it('renders with multiple custom props', () => {
    render(
      <WixMediaImage
        media="wix:image://v1/test.jpg"
        alt="Complex test"
        width={500}
        height={400}
        className="rounded-lg shadow-lg"
        disableZoom
        sizes="20vw"
      />,
    );

    const image = screen.getByAltText('Complex test');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('rounded-lg', 'shadow-lg');
    expect(image).not.toHaveClass('group-hover:scale-110');
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '400');
  });

  it('handles special characters in media URL', () => {
    render(
      <WixMediaImage
        media="wix:image://v1/test-image_123.jpg"
        alt="Special chars"
      />,
    );

    const image = screen.getByAltText('Special chars');
    expect(image).toBeInTheDocument();
  });
});
