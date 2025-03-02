<div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    {currentCreator.name}
                    {currentCreator.featured && (
                      <span className="ml-2 bg-yellow-400 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Award className="h-3 w-3 mr-1" /> Featured
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">@{currentCreator.username}</p>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button 
                    theme={theme} 
                    variant="secondary" 
                    colorMode={colorMode}
                    onClick={() => handleContact(currentCreator.id)}
                    className="text-sm"
                  >
                    Contact
                  </Button>
                  <Button 
                    theme={theme} 
                    variant="primary" 
                    colorMode={colorMode}
                    onClick={() => handleHire(currentCreator.id)}
                    className="text-sm"
                  >
                    Collaborate
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {currentCreator.location.city}, {currentCreator.location.country}
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {currentCreator.metrics.rating} ({currentCreator.metrics.reviewCount || 0} reviews)
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {currentCreator.metrics.completedProjects} projects completed
                </div>
              </div>
              
              {/* Availability Status */}
              {currentCreator.isAvailableForHire !== undefined && (
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentCreator.isAvailableForHire 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {currentCreator.isAvailableForHire ? 'Available for collaboration' : 'Not available for collaboration'}
                  </span>
                  
                  {currentCreator.freelanceStatus && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Freelance
                    </span>
                  )}
                  
                  {currentCreator.fulltimeStatus && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Full-time
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Bio */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">About</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {currentCreator.bio}
            </p>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
            <button
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'projects' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Projects
            </button>
            
            <button
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'showcases' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('showcases')}
            >
              <Layers className="h-5 w-5 mr-2" />
              Showcases
            </button>
            
            <button
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'portfolio' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              <Image className="h-5 w-5 mr-2" />
              Portfolio
            </button>
            
            <button
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'awards' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('awards')}
            >
              <Award className="h-5 w-5 mr-2" />
              Awards
            </button>
            
            <button
              className={`flex items-center px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'about' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('about')}
            >
              <User className="h-5 w-5 mr-2" />
              About
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-8">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Projects</h2>
              
              {currentCreator.projects && currentCreator.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCreator.projects.map((project) => (
                    <Card key={project.id} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewProject(project.id)}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{project.title}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            project.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Tag className="h-3.5 w-3.5 mr-1" />
                          {project.category}
                          
                          {project.releaseDate && (
                            <>
                              <span className="mx-2">•</span>
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {new Date(project.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects available</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    This creator hasn't added any projects yet.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Showcases Tab */}
          {activeTab === 'showcases' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Showcases</h2>
              
              {currentCreator.showcases && currentCreator.showcases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCreator.showcases.map((showcase) => (
                    <Card key={showcase.id} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewShowcase(showcase.id)}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={showcase.thumbnail} 
                          alt={showcase.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{showcase.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                          {showcase.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {new Date(showcase.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          
                          <div className="flex items-center">
                            {showcase.attendanceType === 'virtual' ? (
                              <Globe className="h-3.5 w-3.5 mr-1" />
                            ) : (
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                            )}
                            <span className="truncate max-w-[120px]">{showcase.location}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Layers className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No showcases available</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    This creator hasn't participated in any showcases yet.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Portfolio</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCreator.portfolio.map((item, index) => (
                  <Card key={index} theme={theme} colorMode={colorMode} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <a 
                        href={item.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Project <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Awards Tab */}
          {activeTab === 'awards' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Awards & Recognition</h2>
              
              {currentCreator.awards && currentCreator.awards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCreator.awards.map((award, index) => (
                    <Card key={index} theme={theme} colorMode={colorMode}>
                      <div className="flex items-start">
                        <div className="mr-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                          <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{award.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {award.organization} • {award.year}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {award.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No awards available</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    This creator hasn't added any awards or recognition yet.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About {currentCreator.name}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  <Card theme={theme} colorMode={colorMode} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Experience</h3>
                    <div className="space-y-6">
                      {currentCreator.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{exp.role}</h4>
                              <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {currentCreator.education && (
                    <Card theme={theme} colorMode={colorMode} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Education</h3>
                      <div className="space-y-6">
                        {currentCreator.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{edu.degree}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {edu.year}
                              </span>
                            </div>
                            {edu.description && (
                              <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                  
                  {currentCreator.teamMembers && (
                    <Card theme={theme} colorMode={colorMode}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Team Members</h3>
                      <div className="space-y-4">
                        {currentCreator.teamMembers.map((member, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{member.name}</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">{member.role}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {member.bio}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
                
                {/* Right Column */}
                <div>
                  <Card theme={theme} colorMode={colorMode} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentCreator.categories.map((category, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {currentCreator.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                  
                  {currentCreator.creatorType === 'crew' && currentCreator.equipmentOwned && (
                    <Card theme={theme} colorMode={colorMode} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Equipment</h3>
                      <ul className="space-y-2">
                        {currentCreator.equipmentOwned.map((equipment, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {equipment}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                  
                  {currentCreator.creatorType === 'crew' && currentCreator.specializations && (
                    <Card theme={theme} colorMode={colorMode}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Specializations</h3>
                      <ul className="space-y-2">
                        {currentCreator.specializations.map((specialization, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                            {specialization}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                  
                  {currentCreator.creatorType === 'influencer' && currentCreator.platforms && (
                    <Card theme={theme} colorMode={colorMode}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Platforms & Content</h3>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentCreator.platforms.map((platform, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {currentCreator.contentTypes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Types</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentCreator.contentTypes.map((type, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfilePage;