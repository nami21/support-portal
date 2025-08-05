import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Eye, 
  Award,
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const leadership = [
  {
    name: 'Sarah Johnson',
    title: 'Chief Executive Officer',
    bio: 'Sarah leads our company with over 15 years of experience in technology and business strategy.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    email: 'sarah.johnson@company.com'
  },
  {
    name: 'Michael Chen',
    title: 'Chief Technology Officer',
    bio: 'Michael oversees our technology infrastructure and innovation initiatives.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    email: 'michael.chen@company.com'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Chief Operating Officer',
    bio: 'Emily ensures operational excellence and drives our day-to-day business operations.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    email: 'emily.rodriguez@company.com'
  },
  {
    name: 'David Thompson',
    title: 'Chief Financial Officer',
    bio: 'David manages our financial strategy and ensures sustainable growth.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    email: 'david.thompson@company.com'
  }
];

export default function AboutUs() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
          <p className="text-slate-600 mt-1">Learn more about our company and leadership team</p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl p-8 text-white">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Building className="w-8 h-8 mr-3 text-white" />
            Company Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-red-100 leading-relaxed mb-6">
                We are a forward-thinking technology company dedicated to delivering innovative solutions 
                that empower businesses and transform industries. Our commitment to excellence drives 
                everything we do, from product development to customer service.
              </p>
              <p className="text-red-100 leading-relaxed">
                Founded with the vision of making technology accessible and impactful, we continue to 
                push boundaries and set new standards in our field. Our diverse team of experts works 
                collaboratively to solve complex challenges and create value for our clients.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Founded</h3>
                <p className="text-red-100">2015</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Employees</h3>
                <p className="text-red-100">250+ professionals</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Locations</h3>
                <p className="text-red-100">5 offices worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-red-600" />
            Our Mission
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            The Technology Group will focus on innovation that will allow 
            M Lhuillier to widen its businesses globally.
            We will strive to make our strategic initiatives become an asset and strength to M Lhuillier’s core business which is Financial Services. 
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Eye className="w-6 h-6 mr-3 text-red-600" />
            Our Vision
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            To be recognized as an expert strategic and innovative team and make impact to the company’s decision making by bringing together the best of all resources in man-power, services, technology by 2030.
To be recognized as the most advanced team in terms of innovation and strategic thinking.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
          <Award className="w-6 h-6 mr-3 text-red-600" />
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Innovation</h3>
            <p className="text-slate-600 text-sm">
              We embrace creativity and continuously seek new ways to solve problems and improve our solutions.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Excellence</h3>
            <p className="text-slate-600 text-sm">
              We maintain the highest standards in everything we do, from code quality to customer service.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Collaboration</h3>
            <p className="text-slate-600 text-sm">
              We believe in the power of teamwork and foster an environment of mutual respect and support.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Integrity</h3>
            <p className="text-slate-600 text-sm">
              We conduct business with honesty, transparency, and ethical practices in all our interactions.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
          <Users className="w-6 h-6 mr-3 text-red-600" />
          Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((leader, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
              <p className="text-red-600 font-medium mb-3">{leader.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{leader.bio}</p>
              <a
                href={`mailto:${leader.email}`}
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Headquarters</h3>
              <p className="text-slate-600">
                123 Innovation Drive<br />
                Tech City, TC 12345<br />
                United States
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
              <p className="text-slate-600">
                Main: +1 (555) 123-4567<br />
                Support: +1 (555) 123-HELP<br />
                Fax: +1 (555) 123-4568
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">
                General: info@company.com<br />
                Support: support@company.com<br />
                Sales: sales@company.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}