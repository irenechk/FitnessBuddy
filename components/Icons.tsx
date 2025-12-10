import React from 'react';
import { 
  Activity, ArrowUpCircle, ChevronsUp, TrendingUp, Minus, Circle, RefreshCw, 
  ArrowUp, ArrowDown, Move, Square, ArrowDownCircle, CornerRightDown, Hand, 
  UserCheck, GitMerge, User, Play, Pause, SkipForward, Volume2, VolumeX, 
  Calendar, Clock, Flame, ChevronLeft, Plus, Trash2, CheckCircle, LogOut,
  Camera, Utensils, BarChart2, Users, Droplet, Moon, Zap, Trophy, Target, 
  Smartphone, Share2, Scan, Dumbbell, Home, Heart
} from 'lucide-react';

export const IconMap: Record<string, React.ElementType> = {
  Activity, ArrowUpCircle, ChevronsUp, TrendingUp, Minus, Circle, RefreshCw,
  ArrowUp, ArrowDown, Move, Square, ArrowDownCircle, CornerRightDown, Hand,
  UserCheck, GitMerge, User, Play, Pause, SkipForward, Volume2, VolumeX,
  Calendar, Clock, Flame, ChevronLeft, Plus, Trash2, CheckCircle, LogOut,
  Camera, Utensils, BarChart2, Users, Droplet, Moon, Zap, Trophy, Target,
  Smartphone, Share2, Scan, Dumbbell, Home, Heart
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  const IconComponent = IconMap[name] || Activity;
  return <IconComponent size={size} className={className} />;
};